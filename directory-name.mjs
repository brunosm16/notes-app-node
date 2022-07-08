import * as url from "url";
import * as path from "path";

const fileName = url.fileURLToPath(import.meta.url)
const directoryName = path.dirname(fileName)
export default directoryName;
