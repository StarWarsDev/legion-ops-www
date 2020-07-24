import React from "react";

export default function Matches({ matches }) {
  return (
    <div>
      {matches.map( match => (
        <div key={match.id}>
          <pre><code>{JSON.stringify(match, undefined, 2)}</code></pre>
          <hr />
        </div>
      ))}
    </div>
  )
}