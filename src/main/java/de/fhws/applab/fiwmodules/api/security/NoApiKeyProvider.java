package de.fhws.applab.fiwmodules.api.security;

import de.fhws.applab.norbury.core.api.apikey.ApiKeyHeader;
import de.fhws.applab.norbury.core.api.apikey.ApiKeyInfo;
import de.fhws.applab.norbury.core.api.apikey.ApiKeyInfoProvider;

/**
 * Created by braunpet on 27.07.15.
 */
public class NoApiKeyProvider implements ApiKeyInfoProvider
{
	@Override public ApiKeyInfo get( ApiKeyHeader apiKeyHeader )
	{
		return new ApiKeyInfo( true );
	}
}
