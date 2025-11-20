## Glossary

**Provisioning:**How user accounts are created in Webflow.**Authentication (auth):**How users log in securely.******Deprovisioning:**How users are removed from Webflow access.

Deprovisioning

Description

Best for…

Manual deprovisioning

Manual account creation via Webflow sign up form with username and password authentication only.


Manual deprovisioning by workspace admin in workspace dashboard.

Small teams without IT support, minimal security needs

Manual deprovisioning

Manual account creation via Webflow form with username and password authentication with second factor (authenticator app code).


Manual deprovisioning by workspace admin in workspace dashboard.

Small teams without IT support who want improved security without strict enforcement (end-users set up 2FA themselves, no workspace enforcement available today).

Manual deprovisioning

Manual account creation but secure authentication via identity provider (e.g., Okta) for end-users assigned to Webflow app in IdP. Users authenticate via identity provider (e.g., Okta) or username/password.


Manual deprovisioning by workspace admin in workspace dashboard.

Teams with IT support who want SSO security while leaving user management mostly to workspace admins.


This setup is also helpful for teams working with smaller service providers or short-term contractors — especially those who don’t specialize in Webflow and don’t have their own workspace (a requirement for the guest role). These users often need to be added as full workspace members, and if SSO is enforced they’d be blocked. Allowing username/password login ensures they can still access the client workspace.

Manual deprovisioning

Manual account creation but users authenticate exclusively via identity provider (no username/password login).


Manual deprovisioning by workspace admin in workspace dashboard

Security-conscious teams that want to enforce strict IdP-based access control but still prefer seat management and invitations to be handled by workspace admins.


This setup also works well for teams when collaborating with established service providers or Webflow agencies that have their own workspace and join their clients workspaces as guests. Since SSO-only restrictions don’t apply to guest user types, these users can still access the workspace without issue. However, if the team is working with smaller service providers or contractors who don’t have their own workspace, SSO-only is not recommended for this reason (see above).

SCIM deprovisioning recommended

Accounts auto-created on first IdP login; authentication via identity provider only.


Centralized user removal via SCIM in IdP. Requires SSO.

Security-focused teams that want automated user provisioning and deprovisioning via IdP, shifting seat assignment responsibilities to IT. Want instant, centralized user removal.

SCIM deprovisioning recommended

IT provisions and manages users directly via IdP before users ever log in; authentication via identity provider only.


Centralized user removal via SCIM in IdP. Requires SSO.

Highly secure teams requiring complete IT-managed provisioning, deprovisioning, and precise alignment between IdP and Webflow access. Want instant, centralized user removal.

*Note: Some of these features are only available to customers on an enterprise plan.*

## Next up: Inviting your team

Invite your team onto the Webflow platform so they can collaborate together.

## More ways to level up

- Help Center
Find solutions to your Webflow questions and get help from our expert customer support team.

Go to docs - Community
Connect with other designers and developers to share tips, ask questions, and show off your work.

Go to forum

**Webflow**Way
