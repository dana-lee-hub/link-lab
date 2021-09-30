import { MongoClient } from 'mongodb'
import { failureServiceResponse, IServiceResponse, isILink, ILink } from '../types'
import { LinkCollectionConnection } from './LinkCollectionConnection'

/**
 * LinkGateway handles requests from LinkRouter, and calls on methods
 * in LinkCollectionConnection to interact with the database. It contains
 * the complex logic to check whether the request is valid, before
 * modifying the database.
 *
 */
export class LinkGateway {
  linkCollectionConnection: LinkCollectionConnection

  constructor(mongoClient: MongoClient, collectionName?: string) {
    this.linkCollectionConnection = new LinkCollectionConnection(
      mongoClient,
      collectionName ?? 'links'
    )
  }

  /**
   * Method to create an link and insert it into the database.
   * Note, we do not check whether nodeId exists in the nodeCollection because
   * nodes and links are totally separate microservices - in your final project,
   * you may want to integrate both microservices together if you need more robustness.
   *
   * @param link - The link to be created and inserted into the database.
   */
  async createLink(link: any): Promise<IServiceResponse<ILink>> {
    return failureServiceResponse('Hidden for assignment')
  }

  /**
   * Method to retrieve link with a given linkId.
   *
   * TODO:
   * 1. Call on LinkCollectionConnection method to retrieve link
   *
   * @param linkId - The linkId of the link to be retrieved.
   * @returns IServiceResponse<ILink>
   */
  async getLinkById(linkId: string): Promise<IServiceResponse<ILink>> {
    return failureServiceResponse('Hidden for assignment')
  }

  /**
   * Method to delete all links in the database.
   *
   * TODO:
   * 1. Call on respective method in linkCollectionConnection
   *
   * @returns IServiceResponse<{}>
   */
  async deleteAll(): Promise<IServiceResponse<{}>> {
    return failureServiceResponse('Hidden for assignment')
  }

  /**
   * Method to delete link with the given linkId.
   * Note, this does not delete any anchors associated with the deleted link.
   * The frontend will call deleteLink separately if needed.
   * Also note that unlike deleteNode() in nodeGateway, this will return
   * a failure response if node to delete was not found or node deletion failed.
   *
   * TODO:
   * INSERT STEPS HERE
   *
   * @param linkId the linkId of the link
   * @returns Promise<IServiceResponse<{}>>
   */
  async deleteLink(linkId: string): Promise<IServiceResponse<{}>> {
    return failureServiceResponse('Hidden for assignment')
  }

  async getLinksByAnchorId(anchorId: string): Promise<IServiceResponse<ILink[]>> {
    return failureServiceResponse('Hidden for assignment')
  }
}
