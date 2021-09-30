import express, { Request, Response, Router } from 'express'
import { MongoClient } from 'mongodb'
import { IServiceResponse, isIAnchor, IAnchor } from '../types'
import { AnchorGateway } from './AnchorGateway'

// eslint-disable-next-line new-cap
export const AnchorExpressRouter = express.Router()

/**
 * AnchorRouter uses AnchorExpressRouter (an express router) to define responses
 * for specific HTTP requests at routes starting with '/anchor'.
 * E.g. a post request to '/anchor/create' would create a anchor.
 * The AnchorRouter contains a AnchorGateway so that when an HTTP request
 * is received, the AnchorRouter can call specific methods on AnchorGateway
 * to trigger the appropriate response. See server/src/app.ts to see how
 * we set up AnchorRouter - you don't need to know the details of this just yet.
 */
export class AnchorRouter {
  anchorGateway: AnchorGateway

  constructor(mongoClient: MongoClient) {
    this.anchorGateway = new AnchorGateway(mongoClient)

    /**
     * Request to create anchor
     * @param req request object coming from client
     * @param res response object to send to client
     */
    AnchorExpressRouter.post('/create', async (req: Request, res: Response) => {
      // hidden for assignment
    })

    /**
     * Request to retrieve anchor by anchorId
     * @param req request object coming from client
     * @param res response object to send to client
     */
    AnchorExpressRouter.get('/:anchorId', async (req: Request, res: Response) => {
      // hidden for assignment
    })

    /**
     * Request to retrieve anchors by nodeId
     * @param req request object coming from client
     * @param res response object to send to client
     */
    AnchorExpressRouter.get(
      '/getByNodeId/:nodeId',
      async (req: Request, res: Response) => {
        // hidden for assignment
      }
    )

    /**
     * Request to delete the anchor with the given anchorId
     * @param req request object coming from client
     * @param res response object to send to client
     */
    AnchorExpressRouter.delete('/:anchorId', async (req: Request, res: Response) => {
      // hidden for assignment
    })
  }

  /**
   * @returns AnchorRouter class
   */
  getExpressRouter = (): Router => {
    return AnchorExpressRouter
  }
}
