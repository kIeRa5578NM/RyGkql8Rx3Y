// 代码生成时间: 2025-08-04 22:12:34
import Ember from 'ember';
import { task } from 'ember-concurrency';
import { A } from 'ember-array/utils';
import { computed } from '@ember/object';
import { service } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Ember.Component.extend({
  // Dependencies
  store: service(),
  router: service(),

  // State
  migrations: A(),
  isLoading: false,
  isError: false,
  errorMessage: "",

  // Computed properties
  migrationList: computed('isLoading', function() {
    return this.isLoading ? 'Loading...' : this.migrations.join('
');
  }),

  // Tasks
  fetchMigrations: task(function* () {
    try {
      this.set('isLoading', true);
      const migrations = yield this.store.findAll('migration');
      this.set('migrations', migrations);
    } catch (error) {
      this.set('isError', true);
      this.set('errorMessage', error.message);
    } finally {
      this.set('isLoading', false);
    }
  }).restartable(),

  applyMigrations: task(function* () {
    try {
      this.set('isLoading', true);
      for (let migration of this.migrations) {
        // Assuming there is a method to apply a migration
        yield migration.apply();
      }
      this.router.transitionTo('index'); // Redirect to index route after migrations
    } catch (error) {
      this.set('isError', true);
      this.set('errorMessage', error.message);
    } finally {
      this.set('isLoading', false);
    }
  }).restartable(),

  // Actions
  actions: {
    fetchMigrationsAction() {
      this.fetchMigrations.perform();
    },
    applyMigrationsAction() {
      this.applyMigrations.perform();
    },
  },

  // Lifecycle hooks
  didReceiveAttrs() {
    this._super(...arguments);
    this.fetchMigrations.perform();
  },
});