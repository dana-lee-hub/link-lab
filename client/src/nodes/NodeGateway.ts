import { failureServiceResponse, INode, IServiceResponse, TreeWrapper } from '../types'
import { get, post, put, remove } from './request'

/** In development mode (locally) the server is at localhost:5000*/
let baseEndpoint = 'http://localhost:5000/'

if (process.env.REACT_APP_BACKEND_ENV === 'production') {
  /** TODO: Update with heroku URL*/
  baseEndpoint = ''
}

/** This is the path to the mongo collection */
const servicePath = 'node/'

/**
 * [FRONTEND NODE GATEWAY]
 * NodeGateway handles HTTP requests to the host, which is located on the server.
 * This NodeGateway object uses the baseEndpoint, and additional server information
 * to access the requested information.
 *
 * These methods use the get, post, put and remove http requests from request.ts
 * helper methods to make requests to the server.
 */
const NodeGateway = {
  /**
   * createNode
   *
   * TODO: (Lab 1)
   * 1. Try to submit a post request
   * 2. Catch exceptions and return a failureServiceResponse if it is unsuccessful
   *
   * @param node
   * @returns
   */
  createNode: async (node: INode): Promise<IServiceResponse<INode>> => {
    try {
      return await post<IServiceResponse<INode>>(baseEndpoint + servicePath + 'create', {
        node: node,
      })
    } catch (exception) {
      return failureServiceResponse('[createNode] Unable to access backend')
    }
  },
  /**
   * getNode
   *
   * TODO:
   * 1.
   * 2.
   *
   * @param nodeId
   * @returns
   */
  getNode: async (nodeId: string): Promise<IServiceResponse<INode>> => {
    try {
      return await get<IServiceResponse<INode>>(
        baseEndpoint + servicePath + 'get/' + nodeId
      )
    } catch (exception) {
      return failureServiceResponse('[getNode] Unable to access backend')
    }
  },
  /**
   * deleteNode
   *
   * TODO:
   * 1.
   * 2.
   *
   *
   * @param nodeId
   * @returns
   */
  deleteNode: async (nodeId: string): Promise<IServiceResponse<{}>> => {
    try {
      return await remove<IServiceResponse<INode>>(baseEndpoint + servicePath + nodeId)
    } catch (exception) {
      return failureServiceResponse('[deleteNode] Unable to access backend')
    }
  },
  /**
   * TODO:
   * 1. Check the postman for the moveNode put request format
   * 2. Create a put request that returns an IServiceResponse with INode as the payload
   *
   * @param {nodeId, newParentId}
   * - Takes in the current nodeId and the Id of the new parent where it should be moved
   * @returns the INode that has been successfully updated and moved
   */
  moveNode: async ({
    nodeId,
    newParentId,
  }: {
    nodeId: string
    newParentId: string
  }): Promise<IServiceResponse<INode>> => {
    try {
      const emptyBody = {}
      return await put<IServiceResponse<INode>>(
        baseEndpoint + servicePath + 'move/' + `${nodeId}/` + `${newParentId}/`,
        emptyBody
      )
    } catch (exception) {
      return failureServiceResponse('[moveNode] Unable to access backend')
    }
  },
  /**
   * [ALREADY IMPLEMENTED]
   *
   * @param node
   * @returns
   */
  updateNode: async (node: INode): Promise<IServiceResponse<INode>> => {
    try {
      return await put<IServiceResponse<INode>>(baseEndpoint + servicePath, {
        node: node,
      })
    } catch (exception) {
      return failureServiceResponse('[updateNode] Unable to access backend')
    }
  },
  /**
   * [ALREADY IMPLEMENTED]
   * This is a method that sends a request to get the root folders from '~/'
   * and then tree structure
   * @returns
   */
  getRoots: async (): Promise<IServiceResponse<TreeWrapper[]>> => {
    try {
      return await get<IServiceResponse<TreeWrapper[]>>(
        baseEndpoint + servicePath + 'roots'
      )
    } catch (exception) {
      return failureServiceResponse('[getNodeByPath] Unable to access backend')
    }
  },
}

export default NodeGateway
