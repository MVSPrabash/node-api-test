async function main() {
  const res = await fetch('http://localhost:8080/api/users/1', {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify({id: 1, name: "newuser"})
  }).then(res => res.json())
  .then(data => console.log(data));

}

main();
