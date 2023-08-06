import React from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/TermsOfService.css";

const TermsOfService = ({ onAgree }) => {
  const navigate = useNavigate();

  const handleDisagree = () => {
    navigate("/");
  };

  const handleAgree = () => {
    onAgree();
  };

  return (
    <div className="terms-container">
      <h2 className="terms-title">Terms of Service</h2>
      <div className="terms-content">
        <h3>Acceptance of Terms</h3>
        <p>
          By using our application, you agree to comply with and be bound by the
          following terms and conditions. Please review these terms carefully
          before using the service. If you do not agree to these terms, you must
          not use this application.
        </p>

        <h3>Disclaimer</h3>
        <p>
          The information provided by our application is based on historical
          crime data and is intended solely as a proof of concept. The locations
          described within the data may be offset to protect privacy, and as
          such, the application's suggestions are not to be considered as
          guarantees of safety or specific factual representations.
        </p>

        <h3>Limitation of Liability</h3>
        <p>
          While the application offers route suggestions based on historical
          data, the user acknowledges and agrees that these suggestions do not
          guarantee safety or constitute safe routes. The user understands that
          the choice to follow any suggested route is solely their
          responsibility, and they must exercise their judgment in evaluating
          the risks associated with their chosen route. The user agrees to
          assume all risks associated with the use of this application and
          hereby releases and discharges the application's developers, owners,
          and affiliates from any and all liabilities, claims, demands, actions,
          and causes of action whatsoever, directly or indirectly arising out of
          or related to any loss, damage, injury, or death, that may be
          sustained by the user, or to any property belonging to the user, while
          using the application or following any of its suggestions.
        </p>

        <h3>No Warranty</h3>
        <p>
          We make no representations or warranties of any kind, express or
          implied, about the completeness, accuracy, reliability, suitability,
          or availability of the information provided through this application.
          Any reliance you place on such information is therefore strictly at
          your own risk.
        </p>

        <h3>Governing Law</h3>
        <p>
          These Terms of Service shall be governed and construed in accordance
          with the laws of the jurisdiction in which the application's
          developers operate, without regard to its conflict of law provisions.
        </p>

        <h3>Amendment of Terms</h3>
        <p>
          We reserve the right to modify or replace these Terms at any time.
          Continued use of our application after any such changes constitutes
          acceptance of the new Terms.
        </p>
      </div>
      <div className="terms-buttons">
        <button className="button button-decline" onClick={handleDisagree}>
          Disagree
        </button>
        <button className="button button-accept" onClick={handleAgree}>
          Agree
        </button>
      </div>
    </div>
  );
};

export default TermsOfService;
