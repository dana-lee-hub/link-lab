export interface ILink {
  linkId: string
  anchor1Id: string
  anchor2Id: string
}

export function isILink(object: any): object is ILink {
  return (
    typeof (object as ILink).linkId === 'string' &&
    typeof (object as ILink).anchor1Id === 'string' &&
    typeof (object as ILink).anchor2Id === 'string' &&
    (object as ILink).anchor1Id !== (object as ILink).anchor2Id
  )
}

export function makeILink(linkId: string, anchor1Id: string, anchor2Id: string) {
  return {
    linkId: linkId,
    anchor1Id: anchor1Id,
    anchor2Id: anchor2Id,
  }
}

export function isSameLink(l1: ILink, l2: ILink): boolean {
  return (
    l1.linkId === l2.linkId &&
    l1.anchor1Id === l2.anchor1Id &&
    l1.anchor2Id === l2.anchor2Id
  )
}
