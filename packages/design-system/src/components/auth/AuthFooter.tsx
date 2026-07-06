import { Icon } from "../../icons/Icon";

/** .auth-footer — © + support email in mono, pinned to the bottom of AuthPanel. */
export function AuthFooter() {
  return (
    <div className="auth-footer">
      <span>© Matilda 2026</span>
      <a href="mailto:support@matilda.io">
        <Icon.mail width={13} height={13} /> support@matilda.io
      </a>
    </div>
  );
}
