package de.fhws.applab.fiwmodules;

import de.fhws.applab.fiwmodules.api.security.NoApiKeyProvider;
import de.fhws.applab.fiwmodules.api.security.NoAuthenticationProvider;
import de.fhws.applab.fiwmodules.api.states.GetLecturersByQuery;
import de.fhws.applab.fiwmodules.api.states.GetOneLecturer;
import de.fhws.applab.fiwmodules.database.Persistency;
import de.fhws.applab.norbury.core.api.apikey.ApiKeyInfoProvider;
import de.fhws.applab.norbury.core.api.security.AuthenticationInfoProvider;
import de.fhws.applab.norbury.core.database.IPersistency;
import org.glassfish.hk2.utilities.binding.AbstractBinder;

import javax.inject.Singleton;

/**
 * Created by braunpet on 27.07.15.
 */
public class Binder extends AbstractBinder
{
	@Override
	protected void configure( )
	{
		bind( NoAuthenticationProvider.class ).to( AuthenticationInfoProvider.class );
		bind( NoApiKeyProvider.class ).to( ApiKeyInfoProvider.class );

		bind( Persistency.class ).to( IPersistency.class ).in( Singleton.class );
		bind( GetLecturersByQuery.class ).to( GetLecturersByQuery.class );
		bind( GetOneLecturer.class ).to( GetOneLecturer.class );
	}
}
