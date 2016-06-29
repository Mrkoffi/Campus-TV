package de.fhws.applab.fiwmodules.api.services;

import de.fhws.applab.fiwmodules.api.queries.FilterLecturer;
import de.fhws.applab.fiwmodules.api.states.GetLecturersByQuery;
import de.fhws.applab.fiwmodules.api.states.GetOneLecturer;
import de.fhws.applab.norbury.core.api.filter.PagingBehaviorUsingOffsetSize;
import de.fhws.applab.norbury.core.api.services.AbstractService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * Created by braunpet on 05.08.15.
 */
@Path( "mitarbeiter" )
public class LecturerService extends AbstractService
{
	@GET
	@Produces( MediaType.APPLICATION_JSON )
	public Response getAllLecturers(
		@DefaultValue( "" ) @QueryParam( "vorname" ) final String firstName,
		@DefaultValue( "" ) @QueryParam( "nachname" ) final String lastName,
		@DefaultValue( "0" ) @QueryParam( "offset" ) final int offset,
		@DefaultValue( "10" ) @QueryParam( "size" ) final int size )
	{
		final GetLecturersByQuery state = createAndConfigureState( GetLecturersByQuery.class );
		final FilterLecturer filter = new FilterLecturer( firstName, lastName );

		final PagingBehaviorUsingOffsetSize pagingBehavior = new PagingBehaviorUsingOffsetSize( );
		pagingBehavior.setOffset( offset );
		pagingBehavior.setSize( size );

		filter.setPagingBehavior( pagingBehavior );

		state.setQuery( filter );

		return state.build( );
	}

	@GET
	@Produces( MediaType.APPLICATION_JSON )
	@Path( "{id: \\d+}" )
	public Response getLecturer( @PathParam( "id" ) final long id )
	{
		final GetOneLecturer state = createAndConfigureState( GetOneLecturer.class );
		state.setModelId( id );
		return state.build( );
	}
}
