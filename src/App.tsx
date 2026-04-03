import FundTransfer from "./containers/FundTransfer";
import styles from "./index.module.less";
import { FundTransferProvider } from "@/store/fundTransfer/context";

function App() {
  return (
    <div className={styles.app}>
      {/* 全局状态修改 */}
      <FundTransferProvider>
        <FundTransfer />
      </FundTransferProvider>
    </div>
  );
}

export default App;
