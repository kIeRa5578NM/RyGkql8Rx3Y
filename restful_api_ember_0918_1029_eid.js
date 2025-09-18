// 代码生成时间: 2025-09-18 10:29:19
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { A } from '@ember/array';
import { isEmpty } from '@ember/utils';
import { isPresent } from '@ember/utils';
import { runInDebug } from '@ember/debug';

// Mock service for API requests, in a real application this would interact with
// a backend server or external API.
import ApiMockService from './api-mock-service';

// Define the RESTful API route
export default class RestfulApiRoute extends Route {
  @service('api-mock') api; // Inject the API mock service

  // Fetch all resources
  async model() {
    try {
      const resources = await this.api.fetchResources();
      return resources;
    } catch (error) {
      // Handle API errors, rethrow to be handled by the error route
      throw error;
    }
  }

  // Fetch a single resource by id
  async model(params) {
    try {
      const resource = await this.api.fetchResourceById(params.id);
      if (isEmpty(resource)) {
        throw new Error('Resource not found');
      }
      return resource;
    } catch (error) {
      // Handle API errors, rethrow to be handled by the error route
      throw error;
    }
  }

  // Create a new resource
  @action
  async createResource() {
    try {
      const resourceData = this.modelFor('create-resource');
      const newResource = await this.api.createResource(resourceData);
      this.transitionTo('resource.show', newResource.id); // Redirect to the new resource
    } catch (error) {
      // Handle API errors
      this.set('errorMessage', error.message);
    }
  }

  // Update an existing resource
  @action
  async updateResource() {
    try {
      const resourceData = this.modelFor('update-resource');
      const updatedResource = await this.api.updateResourceById(resourceData.id, resourceData);
      this.transitionTo('resource.show', updatedResource.id); // Redirect to the updated resource
    } catch (error) {
      // Handle API errors
      this.set('errorMessage', error.message);
    }
  }

  // Delete a resource
  @action
  async deleteResource(params) {
    try {
      await this.api.deleteResourceById(params.id);
      this.transitionTo('resource.index'); // Redirect to the resource index
    } catch (error) {
      // Handle API errors
      this.set('errorMessage', error.message);
    }
  }
}

// Mock API service (to be replaced with actual API calls)
export default class ApiMockService extends Route {
  // Fetch resources
  async fetchResources() {
    // In a real application, this would be an API call
    return A([{ id: 1, name: 'Resource 1' }, { id: 2, name: 'Resource 2' }]);
  }

  // Fetch a single resource by id
  async fetchResourceById(id) {
    // In a real application, this would be an API call
    return { id, name: `Resource ${id}` };
  }

  // Create a new resource
  async createResource(resourceData) {
    // In a real application, this would involve sending a POST request to the API
    runInDebug(() => {
      console.log('Creating resource:', resourceData);
    });
    return resourceData;
  }

  // Update an existing resource
  async updateResourceById(id, resourceData) {
    // In a real application, this would involve sending a PUT request to the API
    runInDebug(() => {
      console.log('Updating resource:', resourceData);
    });
    return resourceData;
  }

  // Delete a resource by id
  async deleteResourceById(id) {
    // In a real application, this would involve sending a DELETE request to the API
    runInDebug(() => {
      console.log('Deleting resource:', id);
    });
  }
}
