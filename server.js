var version=new Buffer(4);
version.writeUInt32LE(70015,0);
console.log(version);

var services=new Buffer(8);
services.fill(0);
services.writeUInt32LE(0,4);
console.log(services);

var timestamp=new Buffer(8);
const int64 = Date.now() ;  // 1456909977176 (00 00 01 53 36 9a 06 58)
//const b = new Buffer(8);
//b.fill(0);
const MAX_UINT32 = 0xFFFFFFFF;
console.log(int64);
console.log(Number.isSafeInteger(int64));
// write
const big = ~~(int64 / MAX_UINT32);
const low = int64 & MAX_UINT32;

timestamp.writeUInt32LE(big, 4) ; // 00 00 01 53 00 00 00 00
timestamp.writeUInt32LE(low, 0) ; // 00 00 01 53 36 9a 06 58
console.log(timestamp);

var addrRecvServices=new Buffer(8);


var addrRecvIp=new Buffer(16); //big endian


var addrRecvPort=new Buffer(2);//big endian


var addrTransServices=new Buffer(8);


var addrTransIp=new Buffer(16); //big endian


var addrTransPort=new Buffer(2);//big endian


var nonce=new Buffer(8);

var userAgentByte=new Buffer(1);

var startHeight=new Buffer(4);

var relay=new Buffer(4);

var payload=version+services+timestamp+addrRecvServices+addrRecvIp+addrRecvPort+addrTransServices+addrTransIp+
    addrTransPort+nonce+userAgentByte+startHeight+relay;

//Message structure

var magic
var command
var length
var checksum

msg=magic+command+length+checksum+payload;

