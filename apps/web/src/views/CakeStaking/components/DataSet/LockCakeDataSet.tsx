import { useTranslation } from '@pancakeswap/localization'
import { TooltipText } from '@pancakeswap/uikit'
import { getBalanceAmount, getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import BN from 'bignumber.js'
import dayjs from 'dayjs'
import { useVeCakeBalance } from 'hooks/useTokenBalance'
import { useMemo } from 'react'
import { useLockCakeData } from 'state/vecake/hooks'
import { getVeCakeAmount } from 'utils/getVeCakeAmount'
import { useCakeLockStatus } from 'views/CakeStaking/hooks/useVeCakeUserInfo'
import { Tooltips } from '../Tooltips'
import { DataBox, DataHeader, DataRow } from './DataBox'
import { formatDate } from './format'

export const LockCakeDataSet = () => {
  const { t } = useTranslation()
  const { balance: veCakeBalance } = useVeCakeBalance()
  const { cakeUnlockTime, cakeLockedAmount } = useCakeLockStatus()
  const { cakeLockAmount, cakeLockWeeks } = useLockCakeData()
  const amountInputBN = useMemo(() => getDecimalAmount(new BN(cakeLockAmount || 0)), [cakeLockAmount])
  const amountLockedBN = useMemo(() => getBalanceAmount(new BN(cakeLockedAmount.toString() || '0')), [cakeLockedAmount])
  const amount = useMemo(() => {
    return getBalanceAmount(amountInputBN.plus(amountLockedBN))
  }, [amountInputBN, amountLockedBN])
  const veCakeAmount = useMemo(
    () => getBalanceAmount(veCakeBalance).plus(getVeCakeAmount(cakeLockAmount, cakeLockWeeks)),
    [cakeLockAmount, cakeLockWeeks, veCakeBalance],
  )

  const newUnlockTime = useMemo(() => {
    return formatDate(dayjs.unix(cakeUnlockTime).add(Number(cakeLockWeeks), 'weeks'))
  }, [cakeLockWeeks, cakeUnlockTime])

  return (
    <DataBox gap="8px">
      <DataHeader value={String(veCakeAmount.toFixed(2))} />
      <DataRow label={t('CAKE to be locked')} value={amount.toFixed(2)} />
      <DataRow
        label={
          <Tooltips content={t('@todo')}>
            <TooltipText fontSize={12} bold color="textSubtle" textTransform="uppercase">
              {t('Unlock on')}
            </TooltipText>
          </Tooltips>
        }
        value={newUnlockTime}
      />
    </DataBox>
  )
}
