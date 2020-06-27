module.exports = {
  build: {
    src: "src",
    dist: "release",
    temp: ".tmp",
    public: "public",
    paths: {
      pages: "*.html",
      scripts: "assets/scripts/*.scss",
      styles: "assets/styles/*.scss",
      images: "assets/images/**",
      fonts: "assets/fonts/**",
    },
  },
  data: {
    menus: [
      {
        name: "Home ----",
        icon: "aperture",
        link: "index.html",
      },
      {
        name: "Features",
        link: "features.html",
      },
      {
        name: "About",
        link: "about.html",
      },
      {
        name: "Contact",
        link: "#",
        children: [
          {
            name: "Twitter",
            link: "https://twitter.com/w_zce",
          },
          {
            name: "About",
            link: "https://weibo.com/zceme",
          },
          {
            name: "divider",
          },
          {
            name: "About",
            link: "https://github.com/zce",
          },
        ],
      },
    ],
    pkg: require("./package.json"),
    date: new Date(),
  },
};
