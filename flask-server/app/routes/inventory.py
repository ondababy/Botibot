from flask import Blueprint, request, jsonify
from app.services.inventory_service import InventoryService
from app.utils.validators import validate_pill_data
from app.utils.exceptions import ValidationError, DatabaseError

inventory_bp = Blueprint('inventory', __name__)
inventory_service = InventoryService()

@inventory_bp.route('/pills', methods=['GET'])
def get_all_pills():
    try:
        pills = inventory_service.get_all_pills()
        return jsonify({
            'success': True,
            'pills': [pill.to_dict() for pill in pills]
        })
    except DatabaseError as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@inventory_bp.route('/pills/<int:pill_id>', methods=['GET'])
def get_pill(pill_id):
    try:
        pill = inventory_service.get_pill_by_id(pill_id)
        if pill:
            return jsonify({
                'success': True,
                'pill': pill.to_dict()
            })
        else:
            return jsonify({'success': False, 'error': 'Pill not found'}), 404
    except DatabaseError as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@inventory_bp.route('/refill', methods=['POST'])
def refill_pills():
    try:
        data = request.get_json()
        validate_pill_data(data, ['pill_id', 'quantity'])
        
        result = inventory_service.refill_pills(
            pill_id=data['pill_id'],
            quantity=data['quantity'],
            notes=data.get('notes', '')
        )
        
        return jsonify(result)
        
    except ValidationError as e:
        return jsonify({'success': False, 'error': str(e)}), 400
    except DatabaseError as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@inventory_bp.route('/adjust', methods=['POST'])
def adjust_inventory():
    try:
        data = request.get_json()
        validate_pill_data(data, ['pill_id', 'new_count'])
        
        result = inventory_service.adjust_inventory(
            pill_id=data['pill_id'],
            new_count=data['new_count'],
            notes=data.get('notes', 'Manual adjustment')
        )
        
        return jsonify(result)
        
    except ValidationError as e:
        return jsonify({'success': False, 'error': str(e)}), 400
    except DatabaseError as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@inventory_bp.route('/low-stock', methods=['GET'])
def get_low_stock_pills():
    try:
        pills = inventory_service.get_low_stock_pills()
        return jsonify({
            'success': True,
            'low_stock_pills': [pill.to_dict() for pill in pills]
        })
    except DatabaseError as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@inventory_bp.route('/summary', methods=['GET'])
def get_inventory_summary():
    try:
        summary = inventory_service.get_inventory_summary()
        return jsonify({
            'success': True,
            'summary': summary
        })
    except DatabaseError as e:
        return jsonify({'success': False, 'error': str(e)}), 500