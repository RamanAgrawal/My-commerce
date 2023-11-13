
import ContentLoader from 'react-content-loader'
import { isMobile } from '../../utils'

const OrderSkeleton = () => {
  return (
    <ContentLoader viewBox="0 0 400 600" height={600} width={isMobile? 350: 1000}>
      <rect x="20" y="8" rx="0" ry="0" width="100" height="100" />
      <rect x="20" y="120" rx="0" ry="0" width="100" height="10" />
      <rect x="170" y="8" rx="0" ry="0" width="300" height="15" />
      <rect x="170" y="30" rx="0" ry="0" width="300" height="15" />
      <rect x="170" y="52" rx="0" ry="0" width="100" height="15" />
    </ContentLoader>
  )
}


export default OrderSkeleton