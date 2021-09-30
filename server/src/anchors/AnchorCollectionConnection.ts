import { MongoClient } from 'mongodb'
import { failureServiceResponse, IAnchor, IServiceResponse } from '../types'

/**
 * AnchorCollectionConnection acts as an in-between communicator between
 * the MongoDB database and AnchorGateway. AnchorCollectionConnection
 * defines methods that interact directly with MongoDB. That said,
 * it does not include any of the complex logic that AnchorGateway has.
 *
 * @param {MongoClient} client
 * @param {string} collectionName
 */
export class AnchorCollectionConnection {
  client: MongoClient
  collectionName: string

  constructor(mongoClient: MongoClient, collectionName?: string) {
    this.client = mongoClient
    this.collectionName = collectionName ?? 'anchors'
  }

  /**
   * Inserts a new anchor into the database
   * Returns successfulServiceResponse with IAnchor that was inserted as the payload
   * @param {IAnchor} anchor
   * @return successfulServiceResponse<IAnchor>
   */
  async insertAnchor(anchor: IAnchor): Promise<IServiceResponse<IAnchor>> {
    return failureServiceResponse('Hidden for assignment')
  }

  /**
   * Clears the entire anchor collection in the database.
   * @return successfulServiceResponse on success
   *         failureServiceResponse on failure
   */
  async clearAnchorCollection(): Promise<IServiceResponse<{}>> {
    return failureServiceResponse('Hidden for assignment')
  }

  /**
   * Finds Anchor by its unique anchorId
   * @param {string} anchorId
   * @return successfulServiceResponse<IAnchor> on success
   *         failureServiceResponse on failure
   */
  async findAnchorById(anchorId: string): Promise<IServiceResponse<IAnchor>> {
    return failureServiceResponse('Hidden for assignment')
  }

  /**
   * Finds anchors when given a list of anchorIds.
   * Returns successfulServiceResponse with empty array when no anchors found.
   * @param {string[]} anchorIds
   * @return successfulServiceResponse<IAnchor[]>
   */
  async findAnchorsById(anchorIds: string[]): Promise<IServiceResponse<IAnchor[]>> {
    return failureServiceResponse('Hidden for assignment')
  }

  /**
   * Deletes anchor with the given anchorId.
   * @param {string} anchorId
   * @return successfulServiceResponse<IAnchor> on success
   *         failureServiceResponse on failure
   */
  async deleteAnchor(anchorId: string): Promise<IServiceResponse<{}>> {
    return failureServiceResponse('Hidden for assignment')
  }

  /**
   * Deletes anchors when given a list of anchorIds.
   * @param {string[]} anchorIds
   * @return successfulServiceResponse<IAnchor> on success
   *         failureServiceResponse on failure
   */
  async deleteAnchors(anchorIds: string[]): Promise<IServiceResponse<{}>> {
    return failureServiceResponse('Hidden for assignment')
  }

  async findAnchorsByNodeId(nodeId: string): Promise<IServiceResponse<IAnchor[]>> {
    return failureServiceResponse('Hidden for assignment')
  }
}
