# Google API Data — handmadepastaflorence.com

Pulled: 2026-09-03 via claude-seo Google API tooling (service account path).

## Credential Tier

`google_auth.py --check --json` reports **Tier 1** (API key + service account):

| Service | `--check` status | Live call result |
|---|---|---|
| PageSpeed Insights | unavailable — no API key configured | not attempted (confirmed missing) |
| CrUX / CrUX History | unavailable — no API key configured | not attempted (confirmed missing) |
| GA4 Data API | unavailable — no `ga4_property_id` configured | not attempted (confirmed missing) |
| Search Console API | reported available (service account: `gsc-mcp-server@project-6317742d-5528-4d87-b86.iam.gserviceaccount.com`) | **FAILED — see below** |
| Indexing API v3 | reported available (same service account) | not independently tested; shares the same broken credential, so treated as failed |

## Critical finding: service-account credential is broken, not just a permissions issue

The `--check` command only validates that a credential file exists and is well-formed; it does **not** make a live API call. When actual live calls were attempted, every single one failed with the identical OAuth error:

```
invalid_grant: Invalid grant: account not found
```

This error was reproduced on all of the following, regardless of which property was targeted:

- `gsc_query.py sites` (list accessible properties) — failed
- `gsc_query.py --property sc-domain:handmadepastaflorence.com` (Search Analytics) — failed
- `gsc_query.py --property https://handmadepastaflorence.com/` (Search Analytics, URL-prefix form) — failed
- `gsc_query.py sitemaps --property sc-domain:handmadepastaflorence.com` — failed
- `gsc_inspect.py https://handmadepastaflorence.com/` (URL Inspection) — failed

`invalid_grant: account not found` occurs at OAuth token-exchange time, before any per-property permission check runs. It typically means the service account itself no longer exists in Google Cloud (deleted service account or deleted/suspended GCP project) or the stored key has been revoked/rotated out from under the saved JSON key file. System clock was checked and is correct (not a clock-skew cause).

**This is a hard, global credential failure — it is not specific to handmadepastaflorence.com and would block GSC/Indexing API access for every property**, including whichever site this credential was originally provisioned for.

### Secondary, separate misconfiguration found

Independent of the credential failure, the local config at `~/.config/claude-seo/google-api.json` has:

```json
"default_property": "sc-domain:lakebovilla.com"
```

This is an unrelated property (not handmadepastaflorence.com). `gsc_inspect.py` does not appear to accept a `--property` override and silently used this wrong default. Even once the credential is fixed, this default will need to be corrected (or every `gsc_inspect.py` call will need an explicit property flag, if one gets added) before URL Inspection results for this site can be trusted.

## Data actually retrieved

**None.** No live Search Analytics rows, no sitemap status, no URL Inspection results, no PSI/CrUX field data, and no GA4 data were retrieved in this session. All figures relating to this site elsewhere in the audit workspace (e.g. the July 2026 GSC export referenced in prior memory — teambuilding cluster ~36% of impressions, Italian/informational pages ranking pos 5–16, English/commercial pages pos 45–95, brand term "handmade pasta florence" at pos 5.9, US traffic at avg. position 66) are **historical/prior-session data only** and were not re-verified or refreshed by this pull. Do not treat them as current.

## What's needed to unblock

1. Regenerate/re-download the service account JSON key for `gsc-mcp-server@project-6317742d-5528-4d87-b86.iam.gserviceaccount.com` from Google Cloud Console (IAM & Admin → Service Accounts → Keys), or confirm whether that service account / its parent project still exists at all. If the project or account was deleted, a new service account must be created and re-granted access in Search Console (Settings → Users and permissions) for `sc-domain:handmadepastaflorence.com`.
2. Once a working key is in place, re-verify with `gsc_query.py sites --json` that `sc-domain:handmadepastaflorence.com` (or the equivalent URL-prefix property) actually appears in the accessible-sites list — access was never confirmed even before the credential broke.
3. Fix `default_property` in `~/.config/claude-seo/google-api.json` from `sc-domain:lakebovilla.com` to the correct property for this site.
4. Add a PageSpeed Insights / CrUX API key (`GOOGLE_API_KEY` or `api_key` in the same config file) to unlock Tier 0 CWV checks, which are currently unavailable independent of the GSC issue.
5. Add `ga4_property_id` to the config to unlock Tier 2 GA4 organic traffic reporting.

## Status vs. prior memory note

Prior session memory noted "the MCP-level GSC connector in this session's environment is authenticated to a different Google account and can't pull this site's data" and speculated the service-account-based path might be a separate, working credential. That is now disproven for this session: the service-account path is also non-functional, but for a different reason (invalid_grant on the credential itself, not wrong-account access). Both GSC access paths are currently blocked for handmadepastaflorence.com.
