import fetch from 'node-fetch';

const { APIKEY } = process.env;

export default async function handler(req, res) {
  const { title, page, id } = JSON.parse(req.body);
  const url = id
    ? `https://omdbapi.com?${APIKEY}=7035c60c&i=${id}&plot=full`
    : `https://omdbapi.com?${APIKEY}=7035c60c&s=${title}&page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  res.status(200).json(data);
}
