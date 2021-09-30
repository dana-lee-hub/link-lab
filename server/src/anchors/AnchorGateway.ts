import { MongoClient } from 'mongodb'
import { failureServiceResponse, IServiceResponse, IAnchor, isIAnchor } from '../types'
import { AnchorCollectionConnection } from './AnchorCollectionConnection'

/**
 * AnchorGateway handles requests from AnchorRouter, and calls on methods
 * in AnchorCollectionConnection to interact with the database. It contains
 * the complex logic to check whether the request is valid, before
 * modifying the database.
 *
 * Example:
 * Before insertion, AnchorGateway.createAnchor() will check whether the database
 * already contains a anchor with the same anchorId, as well as the the validity of
 * anchor's file path. In comparison, the AnchorCollectionConnection.insertAnchor()
 * method simply retrieves the anchor object, and inserts it into the database.
 */
export class AnchorGateway {
  anchorCollectionConnection: AnchorCollectionConnection

  constructor(mongoClient: MongoClient, collectionName?: string) {
    this.anchorCollectionConnection = new AnchorCollectionConnection(
      mongoClient,
      collectionName ?? 'anchors'
    )
  }

  /**
   * Method to create an anchor and insert it into the database.
   * Note, we do not check whether nodeId exists in the nodeCollection because
   * nodes and anchors are totally separate microservices - in your final project,
   * you may want to integrate both microservices together if you need more robustness.
   *
   * @param anchor - The anchor to be created and inserted into the database.
   */
  async createAnchor(anchor: any): Promise<IServiceResponse<IAnchor>> {
    return failureServiceResponse('Hidden for assignment')
  }

  /**
   * Method to retrieve anchor with a given anchorId.
   *
   * TODO:
   * 1. Call on AnchorCollectionConnection method to retrieve anchor
   *
   * @param anchorId - The anchorId of the anchor to be retrieved.
   * @returns IServiceResponse<IAnchor>
   */
  async getAnchorById(anchorId: string): Promise<IServiceResponse<IAnchor>> {
    return failureServiceResponse('Hidden for assignment')
  }

  /**
   * Method to delete all anchors in the database.
   *
   * TODO:
   * 1. Call on respective method in anchorCollectionConnection
   *
   * @returns IServiceResponse<{}>
   */
  async deleteAll(): Promise<IServiceResponse<{}>> {
    return failureServiceResponse('Hidden for assignment')
  }

  /**
   * Method to delete anchor with the given anchorId.
   * Note, this does not delete any links associated with the deleted anchor.
   * The frontend will call deleteLink separately if needed.
   *
   * TODO:
   * INSERT STEPS HERE
   *
   * @param anchorId the anchorId of the anchor
   * @returns Promise<IServiceResponse<{}>>
   */
  async deleteAnchor(anchorId: string): Promise<IServiceResponse<{}>> {
    return failureServiceResponse('Hidden for assignment')
  }

  async getAnchorsByNodeId(nodeId: string): Promise<IServiceResponse<IAnchor[]>> {
    return failureServiceResponse('Hidden for assignment')
  }
}
