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

# NEW: Add pill route
@inventory_bp.route('/pills', methods=['POST'])
def add_new_pill():
    try:
        data = request.get_json()
        validate_pill_data(data, ['name', 'max_capacity'])
        
        result = inventory_service.add_new_pill(
            name=data['name'],
            max_capacity=data['max_capacity'],
            initial_count=data.get('initial_count', 0),
            low_stock_threshold=data.get('low_stock_threshold'),
            description=data.get('description', ''),
            dosage=data.get('dosage', ''),
            frequency=data.get('frequency', ''),
            compartment_number=data.get('compartment_number')
        )
        
        return jsonify(result), 201
        
    except ValidationError as e:
        return jsonify({'success': False, 'error': str(e)}), 400
    except DatabaseError as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# NEW: Update pill schedule route
@inventory_bp.route('/pills/<int:pill_id>/schedule', methods=['PUT'])
def update_pill_schedule(pill_id):
    try:
        data = request.get_json()
        validate_pill_data(data, ['frequency'])
        
        result = inventory_service.update_pill_schedule(
            pill_id=pill_id,
            frequency=data['frequency'],
            dosage=data.get('dosage', ''),
            notes=data.get('notes', '')
        )
        
        return jsonify(result)
        
    except ValidationError as e:
        return jsonify({'success': False, 'error': str(e)}), 400
    except DatabaseError as e:
        return jsonify({'success': False, 'error': str(e)}), 500

# NEW: Remove pill route
@inventory_bp.route('/pills/<int:pill_id>', methods=['DELETE'])
def remove_pill(pill_id):
    try:
        data = request.get_json() or {}
        
        result = inventory_service.remove_pill(
            pill_id=pill_id,
            reason=data.get('reason', '')
        )
        
        return jsonify(result)
        
    except ValidationError as e:
        return jsonify({'success': False, 'error': str(e)}), 400
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