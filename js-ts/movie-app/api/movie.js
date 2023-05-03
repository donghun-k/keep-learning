import fetch from 'node-fetch';

const { APIKEY } = process.env;

export default async function handler(request, response) {
  const { title, page, id } = JSON.parse(request.body);
  const url = id
    ? `https://omdbapi.com?${APIKEY}=7035c60c&i=${id}&plot=full`
    : `https://omdbapi.com?${APIKEY}=7035c60c&s=${title}&page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  response.status(200).json(data);
}
