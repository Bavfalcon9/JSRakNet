const Packet = require('./packet')
const Identifiers = require('./identifiers')
const InetAddress = require('../utils/inet_address')

'use strict'

class ConnectionRequestAccepted extends Packet {

    constructor() {
        super(Identifiers.ConnectionRequestAccepted)
    }

    #clientAddress
    #requestTimestamp
    #acceptedTimestamp

    read() {
        super.read()
        this.#clientAddress = this.readAddress()
        this.readShort()  // unknown
        for (let i = 0; i < 20; i++) {
            this.readAddress()
        }
        this.#requestTimestamp = this.readLong()
        this.#acceptedTimestamp = this.readLong()
    }

    write() {
        super.write()
        this.writeAddress(this.#clientAddress)
        this.writeShort(0)  // unknown
        let sysAddresses = [new InetAddress('127.0.0.1', 0, 4)]
        for (let i = 0; i < 20; i++) {
            this.writeAddress(sysAddresses[i] || new InetAddress('0.0.0.0', 0, 4))
        }
        this.writeLong(this.#requestTimestamp)
        this.writeLong(this.#acceptedTimestamp)
    }

    set clientAddress(clientAddress) {
        this.#clientAddress = clientAddress
    }

    set requestTimestamp(requestTimestamp) {
        return this.#requestTimestamp = requestTimestamp
    }

    set accpetedTimestamp(accpetedTimestamp) {
        return this.#acceptedTimestamp = accpetedTimestamp
    }

}
module.exports = ConnectionRequestAccepted