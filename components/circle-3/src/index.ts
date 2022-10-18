import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { IntrinsicLoadingCircle } from '@njt-tools-open/icon-loading-solidjs-types/typings/circle';

const createElement = ({
  width = '100%',
  fills = ['#306fbe'],
}: IntrinsicLoadingCircle) => {
  class Loading extends LitElement {
    static styles = css`
      @keyframes loadingCircle {
        to {
          transform: rotate(360deg);
        }
      }
      :host {
        display: inline-block;
        vertial-align: middle;
        width: 100%;
        height: 100%;
      }
      section {
        display: inline-block;
      }
      svg {
        animation: loadingCircle 1s infinite linear;
      }
    `;

    @property()
    ['width']: string = width;

    @property({ type: Array })
    ['fills']: string[] = fills;

    svg = () => {
      const { fills } = this;

      return html`<svg
        viewBox="0 0 1024 1024"
        width="100%"
        height="100%"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
      >
        <path
          fill="${fills[0]}"
          d="M832 512c0-176-144-320-320-320V128c211.2 0 384 172.8 384 384h-64zM192 512c0 176 144 320 320 320v64C300.8 896 128 723.2 128 512h64z"
        ></path>
      </svg>`;
    };

    render() {
      const { width } = this;
      const style = `width: ${width}; height: ${width}`;

      return html` <section style="${style}">${this.svg()}</section> `;
    }

    connectedCallback() {
      super.connectedCallback();
    }
  }

  return Loading;
};

let isDefined = false;

const register = (
  name = 'loading-circle-3',
  options: IntrinsicLoadingCircle = {}
) => {
  if (isDefined) {
    return;
  }
  isDefined = true;
  const Loading = createElement(options);
  window.customElements.define(name, Loading);
};

export { register };
