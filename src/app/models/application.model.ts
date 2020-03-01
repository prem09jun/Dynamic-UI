export class Network {
  host: string;
  odrname: string;
  channelname: string;
  orgdetails: Org[];
}

export class Org {
  orgname: string;
  orgmsp: string;
  caname: string;
  peerdetails: Peer[];
}

export class Peer {
  peername: string;
  numberOfPeer: number;
  numberOfUser: number;
}
