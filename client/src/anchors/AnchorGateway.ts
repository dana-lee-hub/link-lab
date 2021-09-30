import { failureServiceResponse, IAnchor, INode, IServiceResponse } from '../types'
import { get, post, put, remove } from './request'

/** In development mode (locally) the server is at localhost:5000*/
let baseEndpoint = 'http://localhost:5000/'

if (process.env.REACT_APP_BACKEND_ENV === 'production') {
  /** TODO: Update with heroku URL*/
  baseEndpoint = ''
}

/** This is the path to the mongo collection */
const servicePath = 'anchor/'

/**
 * [FRONTEND NODE GATEWAY]
 * NodeGateway handles HTTP requests to the host, which is located on the server.
 * This NodeGateway object uses the baseEndpoint, and additional server information
 * to access the requested information.
 *
 * These methods use the get, post, put and remove http requests from request.ts
 * helper methods to make requests to the server.
 */
const AnchorGateway = {
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
  createAnchor: async (anchor: IAnchor): Promise<IServiceResponse<IAnchor>> => {
    try {
      return await post<IServiceResponse<IAnchor>>(
        baseEndpoint + servicePath + 'create',
        {
          anchor: anchor,
        }
      )
    } catch (exception) {
      return failureServiceResponse('[createAnchor] Unable to access backend')
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
  getAnchor: async (anchorId: string): Promise<IServiceResponse<IAnchor>> => {
    try {
      return await get<IServiceResponse<IAnchor>>(baseEndpoint + servicePath + anchorId)
    } catch (exception) {
      return failureServiceResponse('[getAnchor] Unable to access backend')
    }
  },
  /**
   * getAnchor
   *
   * TODO:
   * 1.
   * 2.
   *
   * @param nodeId
   * @returns
   */
  getAnchorsByNodeId: async (nodeId: string): Promise<IServiceResponse<IAnchor[]>> => {
    try {
      return await get<IServiceResponse<IAnchor[]>>(
        baseEndpoint + servicePath + 'getByNodeId/' + nodeId
      )
    } catch (exception) {
      return failureServiceResponse('[getAnchorsByNodeId] Unable to access backend')
    }
  },
  /**
   * deleteAnchor
   *
   * TODO:
   * 1.
   * 2.
   *
   *
   * @param nodeId
   * @returns
   */
  deleteAnchor: async (anchorId: string): Promise<IServiceResponse<{}>> => {
    try {
      return await remove<IServiceResponse<INode>>(baseEndpoint + servicePath + anchorId)
    } catch (exception) {
      return failureServiceResponse('[deleteAnchor] Unable to access backend')
    }
  },
}

export default AnchorGateway
