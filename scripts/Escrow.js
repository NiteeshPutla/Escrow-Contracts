// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [lawyer,payer,payee]=await hre.ethers.getSigners();

  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(payer.address,payee.address,1000000000000000);

  await escrow.connect(payer).deposit({value:1000000000000000});//payer deposits the money

  await escrow.connect(payee).submitWork();//comment this to check if the work is done or not
  await escrow.connect(lawyer).release();//lawyer releases it when the work is done


  await escrow.deployed();
  const balance=await escrow.balanceOf();
  const balanceOfPayee=await hre.ethers.provider.getBalance(payee.address);

  console.log(
    `contract deployed to ${escrow.address},${balance},${balanceOfPayee}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
