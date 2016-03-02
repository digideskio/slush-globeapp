const css = `

.paywall {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #222;
  backface-visibilty: hidden;
  overflow: hidden;
  z-index: 8675309;
}
.paywall.hide {
  display: none;
}
.paywall p {
  margin: 0;
  padding: 0;
  width: 100%;
}
.paywall a.btn--sub {
  padding: 0.5em 1em;
  margin: 1.5em 0;
  min-width: 15em;
}
.paywall--content {
  max-width: 40em;
  margin: 0 auto;
  width: 90%;
  text-align: center;
  position: relative;
  top: 45%;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
}
.paywall--cta {
  font-family: Benton, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-style: normal;
  color: #ddd;
  text-shadow: 0 0 8px #000;
}
.paywall--cta:first-of-type:before {
  content: '';
  display: block;
  width: 2em;
  margin: 0 auto;
  border-top: 2px solid #ccc;
  padding-top: 1em;
}
.paywall--login {
  background-color: rgba(0,0,0,0.6);
  border-radius: 3px;
  padding: 0.25em;
}
.paywall .logo--lg {
  fill: #eee;
  margin-bottom: 0.5em;
  min-height: 2em;
  min-width: 12em;
  display: block;
  margin: 0 auto 1em auto;
}
.fullscreen-bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: -100;
}
.fullscreen-bg__video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
}
@media (min-aspect-ratio: 16/9) {
  .fullscreen-bg__video {
    height: 300%;
    top: -100%;
  }
}
@media (max-aspect-ratio: 16/9) {
  .fullscreen-bg__video {
    width: 300%;
    left: -100%;
  }
}

`.trim()

export default css