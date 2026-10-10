function AppFooter() {
  return (
    <footer className="AppFooter bg-info text-center text-lg-start text-white" aria-label="Footer">
      <div className="text-center p-3">
        © 2020 Copyright:{" "}
        <a className="link-light" href="https://github.com/ZHadjah" target="_blank" rel="noreferrer">
          Github
        </a>
        {" · "}
        <a className="link-light" href="https://zachhadjah.netlify.app" target="_blank" rel="noreferrer">
          Portfolio Page
        </a>
      </div>
    </footer>
  );
}
export default AppFooter;