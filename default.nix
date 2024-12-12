with import <nixpkgs> {};

stdenv.mkDerivation rec {
  name = "quiz-maker-env";
  env = buildEnv { name = name; paths = buildInputs; };
  buildInputs = [
    python3
    python3Packages.pip
    python3Packages.flask
    python3Packages.requests
    python3Packages.openai
    nodejs
    yarn
  ];
  nativeBuildInputs = [
    python3
  ];
}
