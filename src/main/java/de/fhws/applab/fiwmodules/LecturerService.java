package de.fhws.applab.fiwmodules;

import de.fhws.applab.fiwmodules.api.filters.CorsFilter;
import de.fhws.applab.norbury.core.AbstractRestApplication;
import org.glassfish.hk2.api.ServiceLocator;
import org.glassfish.jersey.server.spi.Container;
import org.glassfish.jersey.server.spi.ContainerLifecycleListener;

import javax.ws.rs.ApplicationPath;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by braunpet on 27.07.15.
 */
@ApplicationPath( "/api" )
public class LecturerService extends AbstractRestApplication
{
	protected ServiceLocator serviceLocator;

	public LecturerService( )
	{
		super( );
		register( new Binder( ) );
		register( CorsFilter.class );

		register( new ContainerLifecycleListener( )
		{
			public void onStartup( final Container container )
			{
				LecturerService.this.serviceLocator = container.getApplicationHandler( ).getServiceLocator( );
			}

			public void onReload( final Container container )
			{/*...*/}

			public void onShutdown( final Container container )
			{
				/*
				 * Shutdown database layer. This might be the normal IPersitency class or
				 * the Master-Slave Persistency.
				 */
				//				IPersistency persistency = serviceLocator.getService( IPersistency.class );
				//				persistency.shutdown( );
			}
		} );
	}

	@Override protected String getResourceFileName( )
	{
		return "LecturerService.properties";
	}

	@Override
	protected Set<Class<?>> getServiceClasses( )
	{
		final Set<Class<?>> resources = new HashSet<>( );

		resources.add( de.fhws.applab.fiwmodules.api.services.LecturerService.class );

		return resources;
	}
}

