import type { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setChain } from 'state/reducers/user';
import { EtherscanType, formatEtherscanLink, shortenHex } from 'utils/utils';
import useENSName from '../hooks/useENSName';

// TODO: get state from redux
const AccountName: React.FC = () => {
	const { chainId, account } = useWeb3React<Web3Provider>();
	const ENSName = useENSName(account);
	const dispatch = useDispatch();

	useEffect(() => {
		if (chainId) dispatch(setChain(chainId));
	}, [chainId, dispatch]);

	if (!account) return null;

	return (
		<>
			<a href={formatEtherscanLink(EtherscanType.Account, [chainId!, account])} target="_blank" rel="noopener noreferrer">
				{ENSName || `${shortenHex(account, 4)}`}
			</a>
		</>
	);
};

export default AccountName;
