const fs = require('fs');
const path = require('path');
const FabricCAServices = require('fabric-ca-client');
const {
  FileSystemWallet,
  X509WalletMixin,
  Gateway,
} = require('fabric-network');

const ccpPath = path.resolve(
  __dirname,
  '..',
  'connection-org2.json'
);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

// 인증기관과 통신할 수 있는 객체 생성
const caURL = ccp.certificateAuthorities['ca2.example.com'].url;
const ca = new FabricCAServices(caURL);

// 신원 증명서를 저장할 wallet 생성
const walletPath = path.join(process.cwd(), 'wallet');
const wallet = new FileSystemWallet(walletPath);

// 체인코드
const chainCode = 'history';

// 채널
const channel = 'mychannel';


async function main() {
try {
    console.log(`Wallet path: ${walletPath}`);
    // Check to see if we've already enrolled the admin user.
    const adminExists = await wallet.exists('admin');
    if (!adminExists) {
      // Enroll the admin user, and import the new identity into the wallet.
      const enrollment = await ca.enroll({
        enrollmentID: 'admin',
        enrollmentSecret: 'adminpw',
      });
      const identity = X509WalletMixin.createIdentity(
        'Org1MSP',
        enrollment.certificate,
        enrollment.key.toBytes()
      );
      wallet.import('admin', identity);
      console.log(
        'Successfully enrolled admin user "admin" and imported it into the wallet'
      );
    }

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists('user2');
    if (!userExists) {
      // Create a new gateway for connecting to our peer node.
      const gateway = new Gateway();
      await gateway.connect(ccp, {
        wallet,
        identity: 'admin',
        discovery: { enabled: false },
      });

      // Get the CA client object from the gateway for interacting with the CA.
      const ca = gateway.getClient().getCertificateAuthority();
      const adminIdentity = gateway.getCurrentIdentity();

      // Register the user, enroll the user, and import the new identity into the wallet.
      const secret = await ca.register(
        {
          affiliation: 'org2.department1',
          enrollmentID: 'user2',
          role: 'client',
        },
        adminIdentity
      );
      const enrollment = await ca.enroll({
        enrollmentID: 'user2',
        enrollmentSecret: secret,
      });
      const userIdentity = X509WalletMixin.createIdentity(
        'Org2MSP',
        enrollment.certificate,
        enrollment.key.toBytes()
      );
      wallet.import('user2', userIdentity);
      console.log(
        'Successfully registered and enrolled admin user "user1" and imported it into the wallet'
      );
    }
  } catch (err) {
    console.log(err);
  }
}

main();
