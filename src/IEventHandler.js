'use strict'

const Err = require('./Err')

/**
 * EventHandler interface to be implemented by manager processes subscribed to event bus
 */
module.exports = class IEventHandler {
  /**
   * Unique name in stream (used to store cursors)
   */
  get name () { return '' }

  /**
   * Stream name where events are published
   */
  get stream() { return 'main' }

  /**
   * Object map of async event handlers
   * 
   * Example:
   *    get events () {
   *      return {
   *        ['Event1']: async (tenant, event) => {
   *          ...
   *        },
   *        ['Event2']: async (tenant, event) => {
   *          ...
   *        }
   *      }
   *    }
   */
  get events () { return {} }

  /**
   * Handles event
   * 
   * @param {String} tenant Tenant Id
   * @param {Object} event Event Object
   */
  async handle (tenant, event) {
    const eh = this.events[event._e]
    if (eh) await eh(tenant, event)
  }
}
