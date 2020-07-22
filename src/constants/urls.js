const urls = {
  cdn: 'https://d2b46bduclcqna.cloudfront.net',
  api: process.env.NODE_ENV === "production"
    ? "https://legion-ops.herokuapp.com/graphql"
    : "http://localhost:5000/graphql",
  listPath: 'https://legionhq.thefifthtrooper.com/list'
};

export default urls;
