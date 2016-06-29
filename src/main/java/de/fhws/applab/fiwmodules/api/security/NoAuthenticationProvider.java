package de.fhws.applab.fiwmodules.api.security;

import de.fhws.applab.norbury.core.api.security.AuthenticationHeader;
import de.fhws.applab.norbury.core.api.security.AuthenticationInfo;
import de.fhws.applab.norbury.core.api.security.AuthenticationInfoProvider;

/**
 * Created by braunpet on 27.07.15.
 */
public class NoAuthenticationProvider implements AuthenticationInfoProvider
{
	@Override public AuthenticationInfo get( AuthenticationHeader authenticationHeader )
	{
		return new AuthenticationInfo( "", "" );
	}
}
