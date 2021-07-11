import users from "./user.json";
import fs from "fs";
import bcrypt from "bcrypt";

async function main() {
  const content = await Promise.all(
    users.map(async (user) => {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      return user;
    })
  );

  fs.writeFile("hash_users.json", JSON.stringify(content, null, 2), (err) => {
    console.log(err);
  });
}

main();
