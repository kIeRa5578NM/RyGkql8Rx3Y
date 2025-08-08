// 代码生成时间: 2025-08-08 19:53:49
import Ember from 'ember';
import DS from 'ember-data';
import { action } from '@ember/object';

export default class InventoryManagement extends Ember.Controller {
  // Inject the service to handle data persistence
  inventoryService = Ember.inject.service('inventory');

  // List to keep track of inventory items
  items = [];

  // Fetch all inventory items from the service
  model() {
    try {
      this.items = this.inventoryService.findAll();
    } catch (error) {
      console.error('Failed to fetch inventory items:', error);
      this.set('error', 'Failed to fetch inventory items.');
    }
  }

  // Add a new inventory item
  @action
  addNewItem(item) {
    try {
      this.inventoryService.create(item);
      this.items.pushObject(item);
      this.set('newItem', null);
      this.set('error', null);
    } catch (error) {
      console.error('Failed to add new inventory item:', error);
      this.set('error', 'Failed to add new inventory item.');
    }
  }

  // Update an existing inventory item
  @action
  updateItem(item) {
    try {
      this.inventoryService.update(item);
    } catch (error) {
      console.error('Failed to update inventory item:', error);
      this.set('error', 'Failed to update inventory item.');
    }
  }

  // Delete an inventory item
  @action
  deleteItem(item) {
    try {
      this.inventoryService.delete(item);
      this.items.removeObject(item);
    } catch (error) {
      console.error('Failed to delete inventory item:', error);
      this.set('error', 'Failed to delete inventory item.');
    }
  }
}
