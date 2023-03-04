import axios from 'axios';

const delBtns = document.querySelectorAll('.del_btn');
delBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    console.log(btn.dataset.id);
    axios
      .delete('/delete', {
        data: {
          _id: btn.dataset.id,
        },
        withCredentials: true,
      })
      .then((res) => {
        alert(res.data.message);
        location.reload();
      });
  });
});
