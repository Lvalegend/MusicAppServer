function generateNgrams(text, n) {
  text = text.toLowerCase().replace(/\s+/g, ""); // Chuyển chữ thường và loại bỏ khoảng trắng
  let ngrams = [];
  for (let i = 0; i <= text.length - n; i++) {
    ngrams.push(text.substring(i, i + n));
  }
  return ngrams;
}

function jaccardSimilarity(s1, s2, n = 2) {
  let ngrams1 = new Set(generateNgrams(s1, n));
  let ngrams2 = new Set(generateNgrams(s2, n));

  let intersection = new Set([...ngrams1].filter(x => ngrams2.has(x))).size;
  let union = new Set([...ngrams1, ...ngrams2]).size;

  return union !== 0 ? intersection / union : 0.0;
}

const Catalogue = [
  { song_name: 'Em nhớ anh', song_id: 2 },
  { song_name: 'An đẹp trai quá', song_id: 3 },
  { song_name: 'Ngày mưa à ngày nắng', song_id: 11 },
  { song_name: 'fdmfndmnfmdnaaa', song_id: 16 },
  { song_name: 'Có hẹn với thanh xuân', song_id: 18 },
  { song_name: 'Tình yêu chậm trễ', song_id: 19 }
];

const result = ['ngày mưa ngày à nắng'];

function findMostSimilarSong(catalogue, resultText, n = 2) {
  let bestMatch = { song_id: null, similarity: 0 };

  catalogue.forEach(song => {
    resultText.forEach(text => {
      let similarity = jaccardSimilarity(song.song_name, text, n);
      if (similarity > bestMatch.similarity) {
        bestMatch = { song_id: song.song_id, similarity };
      }
    });
  });

  return bestMatch;
}

const bestMatch = findMostSimilarSong(Catalogue, result, 2);
console.log(`Bài hát có độ tương đồng cao nhất: Song ID ${bestMatch.song_id}, Độ tương đồng: ${bestMatch.similarity.toFixed(2)}`);
