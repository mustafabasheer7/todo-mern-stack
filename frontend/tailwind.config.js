module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: {
        "register-image":
          "url('https://cdn.pixabay.com/photo/2018/09/04/10/42/color-3653464_960_720.jpg')",
        "login-image":
          "url('https://cdn.pixabay.com/photo/2016/03/04/08/39/color-1235593_1280.jpg')",
        "main-app":
          "url('https://images.unsplash.com/photo-1649856092355-eee498b1d0f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80')",
      },
      flex: {
        "2": "2 2 0%",
        "3": "3 3 0%",
        "4": "4 4 0%",
        "5": "5 5 0%",
        "6": "6 6 0%",
        "7": "7 7 0%",
      },
    },
  },
  variants: {
    extend: { display: ["group-hover"], animation: ["hover", "focus"] },
    scrollbar: ["rounded"],
  },
  plugins: [require("tailwind-scrollbar")],
};
