import 'dotenv/config';
import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import { retry } from 'wretch/middlewares';

const USER_AGENT = `Home-Is-Where-You-Hang-Your-Hack/nook-weather-${process.env['EMAIL'] ?? ''}`;
const API_MAX_RETRIES = parseInt(process.env['API_MAX_RETRIES'] ?? '5', 10);

// Shared HTTP request
const apiRequest = wretch()
  .headers({ 'user-agent': USER_AGENT })
  .middlewares([
    retry({ maxAttempts: API_MAX_RETRIES }),
  ])
  .addon(QueryStringAddon);

export default apiRequest;
