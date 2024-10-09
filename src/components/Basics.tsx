function Basics() {
  let name: string = "jane";
  let age: number = 20;
  let isSudent: boolean = true;
  let hobbies: string[] = ["running", "jumping", "hiking"];

  interface User {
    username: string;
    age: number;
    isStudent: boolean;
  }

  let user: User = {
    username: "fridah",
    age: 29,
    isStudent: false,
  };

  type X = {
    name: string;
    email: string;
  };

  type Y = X & {
    address: string;
    age: number;
  };

  let user2: Y = {
    name: "frimogen",
    email: "frimogen@gmail.com",
    address: "Nairobi, Kenya",
    age: 29,
  };

  interface Person {
    name: string;
    age?: number;
  }

  interface Guy extends Person {
    profession: string;
  }

  let guy1: Guy = {
    name: "john",
    profession: "cyber",
  };
  console.log(guy1);

  console.log(user2);
  return (
    <div>
      <h1>{name}</h1>
      <h1>{age}</h1>
      <h1>{isSudent}</h1>
      {hobbies.map((hobby) => (
        <p>{hobby}</p>
      ))}
      <h1>{user.username}</h1>
      <h1>{user.age}</h1>
      <h1>{user.isStudent}</h1>
    </div>
  );
}

export default Basics;
