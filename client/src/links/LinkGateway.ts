import { failureServiceResponse, ILink, INode, IServiceResponse } from '../types'
import { get, post, remove } from './request'

/** In development mode (locally) the server is at localhost:5000*/
let baseEndpoint = 'http://localhost:5000/'

if (process.env.REACT_APP_BACKEND_ENV === 'production') {
  /** TODO: Update with heroku URL*/
  baseEndpoint = ''
}

/** This is the path to the mongo collection */
const servicePath = 'link/'

/**
 * [FRONTEND NODE GATEWAY]
 * LinkGateway handles HTTP requests to the host, which is located on the server.
 * This LinkGateway object uses the baseEndpoint, and additional server information
 * to access the requested information.
 *
 * These methods use the get, post, put and remove http requests from request.ts
 * helper methods to make requests to the server.
 */
const LinkGateway = {
  /**
   * createNode
   *
   * @param node
   * @returns
   */
  createLink: async (link: ILink): Promise<IServiceResponse<ILink>> => {
    try {
      return await post<IServiceResponse<ILink>>(baseEndpoint + servicePath + 'create', {
        link: link,
      })
    } catch (exception) {
      return failureServiceResponse('[createNode] Unable to access backend')
    }
  },

  /**
   *
   * @param nodeId
   * @returns
   */
  getLinksByAnchorId: async (anchorId: string): Promise<IServiceResponse<ILink[]>> => {
    try {
      return await get<IServiceResponse<ILink[]>>(
        baseEndpoint + servicePath + 'getByAnchorId/' + anchorId
      )
    } catch (exception) {
      return failureServiceResponse('[getLinksByAnchorId] Unable to access backend')
    }
  },
  /**
   * deleteNode
   *
   * @param nodeId
   * @returns
   */
  deleteLink: async (linkId: string): Promise<IServiceResponse<{}>> => {
    try {
      return await remove<IServiceResponse<INode>>(baseEndpoint + servicePath + linkId)
    } catch (exception) {
      return failureServiceResponse('[deleteLink] Unable to access backend')
    }
  },
}

export default LinkGateway
