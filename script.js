const darkBtn = document.getElementById("dark-mode-btn");

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
