var crypto=require('crypto');

var version=new Buffer(4);
version.writeUInt32LE(70015,0);
console.log(version);

var services=new Buffer(8);
services.fill(0);
services.writeUInt32LE(1,0);
console.log(services);

var timestamp=new Buffer(8);
const int64 = Date.now() ;  // 1456909977176 (00 00 01 53 36 9a 06 58)
//const b = new Buffer(8);
//b.fill(0);
const MAX_UINT32 = 0xFFFFFFFF;
console.log(Number.isSafeInteger(int64));
// write
const big = ~~(int64 / MAX_UINT32);
const low = int64 & MAX_UINT32;

timestamp.writeUInt32LE(big, 4) ; // 00 00 01 53 00 00 00 00
timestamp.writeUInt32LE(low, 0) ; // 00 00 01 53 36 9a 06 58
console.log(timestamp);

var addrRecvServices=new Buffer(8);
addrRecvServices.fill(0);

var addrRecvIp=new Buffer(16); //big endian
addrRecvIp.fill(0);
addrRecvIp.write('127.0.0.1',0)
console.log(addrRecvIp);

var addrRecvPort=new Buffer(2);//big endian
addrRecvPort.fill(0);

var addrTransServices=new Buffer(8);
addrTransServices.fill(0);

var addrTransIp=new Buffer(16); //big endian
addrTransIp.fill(0);

var addrTransPort=new Buffer(2);//big endian
addrTransPort.fill(0);

var nonce=new Buffer(8);
nonce.fill(0);

var userAgentByte=new Buffer(1);
userAgentByte.fill(0);

var startHeight=new Buffer(4);
startHeight.fill(0);

var relay=new Buffer(1);
relay.fill(0);
relay.writeInt8(0,0);
console.log(relay);


var secret='dionisis';
const hash = crypto.createHmac('sha256', secret)
    .digest('hex');
console.log(hash);

var totalLength=version.length+services.length+timestamp.length+addrRecvServices.length+addrRecvIp.length+addrRecvPort.length+
    addrTransServices.length+addrTransIp.length+addrTransPort.length+nonce.length+userAgentByte.length+startHeight.length+relay.length;

var payload=Buffer.concat([version,services,timestamp,addrRecvServices,addrRecvIp,addrRecvPort,addrTransServices,addrTransIp,
    addrTransPort,nonce,userAgentByte,startHeight,relay],totalLength);

console.log(payload);

//Message structure

var magic;
var command;
var length;
var checksum;

msg=magic+command+length+checksum+payload;

