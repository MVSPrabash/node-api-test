async function main() {
  const res = await fetch('http://localhost:8080/api/users/3', {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: "Rohith"})
  }).then(res => res.json())
  .then(data => console.log(data));

  console.log("Updated Users list");
  const r = await fetch('http://localhost:8080/api/users', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => console.log(data));
}

main();
