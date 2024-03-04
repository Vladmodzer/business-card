// const serviseBtn = document.querySelectorAll(".btn-box__btn");
// let clickedBtn = null;
// let roll = null;
// // 3. Function to handle animation on click
// export function crossRotate(btn) {
//   if (clickedBtn !== btn && !roll) {
//     // Compare buttons using !== for reliable comparison
//     btn.querySelector(".btn__img").style.animation =
//       "rotate-cross 1s ease-in-out forwards";
//     clickedBtn = btn; // Update clicked button
//     roll = !roll;
//   } else {
//     if (roll) {
//       btn.querySelector(".btn__img").style.animation =
//         "rotate-cross-back 1s ease-in-out forwards";
//       clickedBtn = btn; // Reset clicked button for another click
//       roll = !roll;
//     }
//   }
//   console.log(clickedBtn);
// }
