async function main() {
  const res = await fetch('http://localhost:8080/api/users', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: 1, name: "mvsprabash"})
  }).then(res => res.json())
  .then(data => console.log(data));

}

main();
